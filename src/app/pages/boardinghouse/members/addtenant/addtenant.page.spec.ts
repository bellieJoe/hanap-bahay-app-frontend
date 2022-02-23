import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddtenantPage } from './addtenant.page';

describe('AddtenantPage', () => {
  let component: AddtenantPage;
  let fixture: ComponentFixture<AddtenantPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtenantPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddtenantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
