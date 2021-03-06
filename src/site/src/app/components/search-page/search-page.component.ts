import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService } from './search.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LibraryService } from '../../shared/library.service';
import * as semver from 'semver';

@Component({
  selector: 'search-page',
  templateUrl: './search-page.component.html'
})
export class SearchPageComponent implements OnInit {
  public searchResults = [];
  public noResults = false;
  public relativeUrl;
  public libraries = ['ids-enterprise', 'ids-css', 'ids-pendo'];
  public libVersion;
  public domain = '';
  public query = '';
  public latestEp;
  public latestCSS;
  public latestPendo;
  @ViewChild('searchForm', { static: true }) searchForm: NgForm;

  constructor(
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute,
    private libraryService: LibraryService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => this.search(params.q));
    this.route.url.subscribe(urlSegment => {
      (<any>window).ga('send', 'pageview');
    });
  }

  handleQuery(searchForm) {
    this.router.navigate(['/search'], { queryParams: { q: `${searchForm.query.trim()}` } });
  }

  search(term) {
    if (term === '' || term === undefined) {
      this.searchResults = [];
      return;
    }
    this.query = term;

    this.libraryService.getLatestLibraryVersions(this.libraries)
      .then(r => {
        const ep = r[0]['files'];
        const css = r[1]['files'];
        const pendo = r[2]['files'];

        this.latestEp = this.orderVersions(ep);
        this.latestCSS = this.orderVersions(css);
        this.latestPendo = this.orderVersions(pendo);

        this.searchService.getSearch(term, this.latestEp[0], this.latestCSS[0], this.latestPendo[0])
          .subscribe(
            res => {
              this.searchResults = res.results.hits;
              this.searchResults.length === 0 ? this.noResults = true : this.noResults = false;
              (<any>window).ga('send', 'pageview', `/search?q=${term}`);
            },
            err => {
              console.error(err);
            },
            () => {
              console.log('done');
            },
          );
      });
  }

  orderVersions(array) {
    return array.map(version => {
      return version.split('/')[2];
    }).sort((a, b) => {
      return semver.compare(a, b);
    }).reverse();
  }

  truncateHighlight(string, limit, after) {
    if (!string || !limit) {
      return;
    }

    let content = string;
    content = content.split(' ').slice(0, limit);
    content = content.join(' ') + (after ? after : '');
    return content;
  }

}
