import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddRRPTypePage } from './add-rrptype.page';

describe('AddRRPTypePage', () => {
  let component: AddRRPTypePage;
  let fixture: ComponentFixture<AddRRPTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRRPTypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddRRPTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
