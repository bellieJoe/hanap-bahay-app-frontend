import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditRrptypePage } from './edit-rrptype.page';

describe('EditRrptypePage', () => {
  let component: EditRrptypePage;
  let fixture: ComponentFixture<EditRrptypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRrptypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditRrptypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
