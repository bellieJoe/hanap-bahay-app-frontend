import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditdetsPage } from './editdets.page';

describe('EditdetsPage', () => {
  let component: EditdetsPage;
  let fixture: ComponentFixture<EditdetsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdetsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditdetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
