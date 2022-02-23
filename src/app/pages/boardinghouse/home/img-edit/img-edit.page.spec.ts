import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImgEditPage } from './img-edit.page';

describe('ImgEditPage', () => {
  let component: ImgEditPage;
  let fixture: ComponentFixture<ImgEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImgEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
