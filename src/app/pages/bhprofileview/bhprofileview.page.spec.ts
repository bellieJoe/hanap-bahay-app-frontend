import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BhprofileviewPage } from './bhprofileview.page';

describe('BhprofileviewPage', () => {
  let component: BhprofileviewPage;
  let fixture: ComponentFixture<BhprofileviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BhprofileviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BhprofileviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
