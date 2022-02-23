import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditprofPage } from './editprof.page';

describe('EditprofPage', () => {
  let component: EditprofPage;
  let fixture: ComponentFixture<EditprofPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditprofPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditprofPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
