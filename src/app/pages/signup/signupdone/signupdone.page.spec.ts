import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignupdonePage } from './signupdone.page';

describe('SignupdonePage', () => {
  let component: SignupdonePage;
  let fixture: ComponentFixture<SignupdonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupdonePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupdonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
