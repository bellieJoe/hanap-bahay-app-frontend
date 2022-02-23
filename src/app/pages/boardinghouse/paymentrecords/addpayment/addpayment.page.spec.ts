import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddpaymentPage } from './addpayment.page';

describe('AddpaymentPage', () => {
  let component: AddpaymentPage;
  let fixture: ComponentFixture<AddpaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpaymentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddpaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
