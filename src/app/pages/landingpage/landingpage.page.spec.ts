import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LandingpagePage } from './landingpage.page';

describe('LandingpagePage', () => {
  let component: LandingpagePage;
  let fixture: ComponentFixture<LandingpagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingpagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LandingpagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
