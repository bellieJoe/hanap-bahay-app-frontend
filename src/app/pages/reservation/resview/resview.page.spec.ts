import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResviewPage } from './resview.page';

describe('ResviewPage', () => {
  let component: ResviewPage;
  let fixture: ComponentFixture<ResviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
