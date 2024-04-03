import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/containers/header/header.component';
import { FooterComponent } from './core/containers/footer/footer.component';
import { ErrorModalComponent } from './core/components/modal/error-modal.component';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        ErrorModalComponent
      ],
      providers: [
        provideMockStore()
      ]
      // schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed
      .overrideComponent(HeaderComponent, { set: { template: '' } })
      .overrideComponent(ErrorModalComponent, { set: { template: '' } })
      .createComponent(AppComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create instance', () => {
    expect(component).toBeTruthy();
  });

  // it('should render title', async () => {
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, menus');
  // });
});
