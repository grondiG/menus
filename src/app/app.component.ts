import { Component, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { ILanguagesOption } from './core/models/languages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly availableLanguages = [ 'en', 'pl' ];

  private translateService: TranslateService = inject(TranslateService);

  ngOnInit() {
    this.translateService.addLangs(this.availableLanguages);
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
    this.buildLanguageOptions();
  }

  private buildLanguageOptions() {
    const ENGLISH = this.translateService.get('ENGLISH');
    const POLISH = this.translateService.get('POLISH');

    forkJoin([
      ENGLISH,
      POLISH
    ]).subscribe(
      _response => {
        this.languageOptions = [{
          value: this.availableLanguages[0],
          label: _response[0],
        }, {
          value: this.availableLanguages[1],
          label: _response[1],
        }];
      }
    );

  }
  changeLanguage(language: ILanguagesOption) {
    this.translateService.use(language.value);
  }
}
