import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvoicesPage } from './invoices.page';

describe('InvoicesPage', () => {
  let component: InvoicesPage;
  let fixture: ComponentFixture<InvoicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvoicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
