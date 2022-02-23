import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RhprofilePage } from './rhprofile.page';

describe('RhprofilePage', () => {
  let component: RhprofilePage;
  let fixture: ComponentFixture<RhprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RhprofilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RhprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
