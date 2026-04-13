# RiskLens Native App

RiskLens is a Snowflake Native App for explainable churn intelligence. It turns raw business tables into account health assessments, churn risk signals, and supporting evidence.

RiskLens supports analysis at either the individual or account level, depending on your entity model and available data.

## What it does

- Understands source tables and assigns semantic roles.
- Generates metadata and analysis-ready features automatically.
- Evaluates churn risk for a person or account entity.
- Explains what changed, why risk increased, and what to investigate next.

## Installation and required grants

Replace `"<app_name>"` below with the installed application name shown in Snowsight.

### 1. Grant Cortex access for model-powered features

RiskLens uses Snowflake Cortex for table-role classification, column binding generation, and churn-risk analysis.

```sql
GRANT DATABASE ROLE SNOWFLAKE.CORTEX_USER TO APPLICATION "<app_name>";
```

Without this grant, metadata refresh still works, but Cortex-powered classification and analysis features are unavailable.

### 2. Grant access to the source tables RiskLens should analyze

Grant database and schema usage first:

```sql
GRANT USAGE ON DATABASE <your_database> TO APPLICATION "<app_name>";
GRANT USAGE ON SCHEMA <your_database>.<your_schema> TO APPLICATION "<app_name>";
```

Then choose one of the following access patterns.

#### Option A: Grant access table by table

```sql
GRANT SELECT ON TABLE <your_database>.<your_schema>.<table_1> TO APPLICATION "<app_name>";
GRANT SELECT ON TABLE <your_database>.<your_schema>.<table_2> TO APPLICATION "<app_name>";
```

Repeat for each table you want the app to use.

#### Option B: Grant schema-wide access for discovery convenience

```sql
GRANT SELECT ON ALL TABLES IN SCHEMA <your_database>.<your_schema> TO APPLICATION "<app_name>";
GRANT SELECT ON FUTURE TABLES IN SCHEMA <your_database>.<your_schema> TO APPLICATION "<app_name>";
```

This broader access is optional. Use it only if you want the Discovery workflow to automatically include all current and future tables in the schema.

After changing grants, open the app and run `Discovery` -> `Refresh table metadata`.

### 3. Optional: enable queued background processing

The Streamlit UI can queue analysis runs through a serverless Snowflake task.

```sql
GRANT EXECUTE TASK ON ACCOUNT TO APPLICATION "<app_name>";
GRANT EXECUTE MANAGED TASK ON ACCOUNT TO APPLICATION "<app_name>";
CALL "<app_name>".CORE.ENABLE_BACKGROUND_TASK();
```

If you skip this step, the app still installs and discovery still works, but queued background analysis from the UI remains unavailable.

### 4. Optional: enable per-user UI state persistence

Grant `READ SESSION` only if you want the app to persist each user’s UI state across Snowsight reloads.

```sql
GRANT READ SESSION ON ACCOUNT TO APPLICATION "<app_name>";
```

### 5. Optional: use a specific warehouse for background task compute

By default the background task uses **Snowflake serverless compute (XSMALL)**. To run it on a specific virtual warehouse instead, grant the warehouse to the app and the UI will automatically offer it in the Warehouse dropdown on the Run Analysis form.

```sql
GRANT USAGE ON WAREHOUSE <warehouse_name> TO APPLICATION "<app_name>";
```

## First-time workflow

1. Open the app in Snowsight.
2. In `Discovery`, click `Refresh table metadata`.
3. Review and classify discovered tables if needed.
4. In `Sources`, create a source configuration and link the tables used for analysis.
5. In `Cases`, add the people or accounts you want to monitor.
6. Run analysis and review the resulting health, churn risk, and supporting evidence.

## Built-in demo workflow

RiskLens includes a packaged synthetic demo dataset for reviews, walkthroughs,
and first-run exploration.

To use it:

1. Open the app in Snowsight.
2. In `Discovery`, click `Load demo data`.
3. Open `Configuration` and confirm `Demo - Enterprise Accounts`.
4. Open `Cases` and review the two demo accounts:
   - `A1001` / Apex Global Manufacturing
   - `A2001` / Borealis Retail Group
5. Run analysis for `A2001` to validate the end-to-end workflow.

`Load demo data` creates demo tables in the app-owned `DEMO` schema, registers
them in Discovery, creates a baseline source config, and preloads the two demo
cases above. Use `Clear demo data` in `Discovery` to remove the packaged demo
objects again.

For the public documentation and reviewer walkthrough, see:

- [https://www.outermeasure.com/risklens/docs](https://www.outermeasure.com/risklens/docs)

## Running analysis from SQL

All analysis procedures are callable directly from a Snowflake worksheet, notebook, or any orchestration tool. Replace `"<app_name>"` with the installed application name.

### Run a single case synchronously

`CORE.RUN_ANALYSIS` runs immediately in the calling session and returns when the analysis is complete.

```sql
-- Find the CASE_ID for the entity you want to analyze
SELECT CASE_ID, ENTITY_ID FROM "<app_name>".STATE.CASES WHERE STATUS = 'ACTIVE';

-- Run analysis (blocks until finished)
CALL "<app_name>".CORE.RUN_ANALYSIS(
    <case_id>,
    'claude-3-5-sonnet',  -- MODEL_NAME
    365,                  -- LOOKBACK_DAYS
    '',                   -- RUN_ID  (leave blank to auto-generate)
    ''                    -- ANALYSIS_DATE (leave blank to use today)
);
```

### Queue all active cases for background processing

`CORE.ENQUEUE_ALL_ACTIVE_CASES` inserts a PENDING row into `STATE.RUN_QUEUE` for every active case. The background task picks them up automatically if it is enabled, or you can drain the queue manually (see below).

```sql
CALL "<app_name>".CORE.ENQUEUE_ALL_ACTIVE_CASES(
    'claude-3-5-sonnet',  -- MODEL_NAME
    365,                  -- LOOKBACK_DAYS
    ''                    -- ANALYSIS_DATE (leave blank to use today)
);
```

This is the recommended call to put inside a scheduled task for nightly batch runs:

```sql
CREATE TASK MY_NIGHTLY_ENQUEUE
    WAREHOUSE = <warehouse_name>
    SCHEDULE  = 'USING CRON 0 2 * * * UTC'
AS
    CALL "<app_name>".CORE.ENQUEUE_ALL_ACTIVE_CASES();
```

### Process the queue manually (no background task required)

`CORE.DRAIN_RUN_QUEUE` processes up to `batch_size` PENDING rows sequentially in the calling session. Useful for one-off processing or when the background task is not enabled.

```sql
-- Process up to 10 pending runs
CALL "<app_name>".CORE.DRAIN_RUN_QUEUE(10);
```

### Check queue status

```sql
SELECT STATUS, COUNT(*) AS N
FROM "<app_name>".STATE.RUN_QUEUE
GROUP BY STATUS
ORDER BY STATUS;
```

## State and core objects

- `STATE.DISCOVERY`: discovered consumer tables and stored metadata.
- `STATE.ENTITY_SOURCE_CONFIGS`: source configurations for a monitored entity type.
- `STATE.ENTITY_SOURCE_CONFIG_TABLES`: additional linked tables for each source configuration.
- `STATE.CASES`: monitored entities keyed to a source configuration.
- `STATE.RESULTS`: persisted analysis results, statuses, and output payloads.
- `STATE.RUN_QUEUE`: queued analysis requests for background execution.
- `CORE`: procedures, helper objects, and analysis logic.
- `UI.HOME`: Streamlit application entry point.

## Analysis outputs

For each monitored case, RiskLens can produce:

- overall account or entity health
- churn risk assessment
- explanation of recent changes and risk drivers
- suggested areas for follow-up investigation
- supporting metadata and analysis context

## Scope

RiskLens is designed for explainable churn analysis over existing Snowflake tables. It does not require a traditional supervised ML pipeline to deliver useful account-risk insights.

RiskLens is best suited for teams that want fast, evidence-backed churn visibility using their existing customer, product, support, and revenue data.

## Current limitations

- Output quality depends on the quality and coverage of the source tables.
- Entity resolution and source configuration should reflect the consumer’s business model.
- Cortex-powered analysis requires the appropriate Snowflake grant.
- The app focuses on explainable risk analysis and workflow-driven investigation; it does not currently train or serve classical ML models.
