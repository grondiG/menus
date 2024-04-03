import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './core/containers/header/header.component';
import { FooterComponent } from './core/containers/footer/footer.component';
import { ErrorModalComponent } from './core/components/modal/error-modal.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
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

  it(`should have as title 'menus'`, () => {
    expect(component.title).toEqual('menus');
  });

  // it('should render title', async () => {
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, menus');
  // });
});
