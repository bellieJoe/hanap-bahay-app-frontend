import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImgviewPage } from './imgview.page';

describe('ImgviewPage', () => {
  let component: ImgviewPage;
  let fixture: ComponentFixture<ImgviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImgviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
