import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApprovresformPage } from './approvresform.page';

describe('ApprovresformPage', () => {
  let component: ApprovresformPage;
  let fixture: ComponentFixture<ApprovresformPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovresformPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApprovresformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
