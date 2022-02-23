import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BhreservationsPage } from './bhreservations.page';

describe('BhreservationsPage', () => {
  let component: BhreservationsPage;
  let fixture: ComponentFixture<BhreservationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BhreservationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BhreservationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
