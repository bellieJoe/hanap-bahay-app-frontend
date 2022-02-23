import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditroomnamePage } from './editroomname.page';

describe('EditroomnamePage', () => {
  let component: EditroomnamePage;
  let fixture: ComponentFixture<EditroomnamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditroomnamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditroomnamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
