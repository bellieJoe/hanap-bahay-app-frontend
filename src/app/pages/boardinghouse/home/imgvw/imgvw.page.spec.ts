import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImgvwPage } from './imgvw.page';

describe('ImgvwPage', () => {
  let component: ImgvwPage;
  let fixture: ComponentFixture<ImgvwPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgvwPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImgvwPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
