import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditformPage } from './editform.page';

describe('EditformPage', () => {
  let component: EditformPage;
  let fixture: ComponentFixture<EditformPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditformPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
