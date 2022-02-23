import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReservationPage } from './reservation.page';

describe('ReservationPage', () => {
  let component: ReservationPage;
  let fixture: ComponentFixture<ReservationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
