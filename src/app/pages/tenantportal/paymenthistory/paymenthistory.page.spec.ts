import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaymenthistoryPage } from './paymenthistory.page';

describe('PaymenthistoryPage', () => {
  let component: PaymenthistoryPage;
  let fixture: ComponentFixture<PaymenthistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymenthistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymenthistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
