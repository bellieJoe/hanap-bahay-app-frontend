import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImgupldPage } from './imgupld.page';

describe('ImgupldPage', () => {
  let component: ImgupldPage;
  let fixture: ComponentFixture<ImgupldPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgupldPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImgupldPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
