import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class="card">
      <div class="card-body">
        <div class="col-sm-12" style="text-align: center;">
          <h1>Oops! Page not found</h1>
          <a href="/smoothies">Smoothies :)</a>
        </div>
      </div>
    </div>`
})
export class PageNotFoundComponent {}
