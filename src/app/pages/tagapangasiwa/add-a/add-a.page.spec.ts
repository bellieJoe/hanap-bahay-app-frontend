import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddAPage } from './add-a.page';

describe('AddAPage', () => {
  let component: AddAPage;
  let fixture: ComponentFixture<AddAPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddAPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
