import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegtenantPage } from './regtenant.page';

describe('RegtenantPage', () => {
  let component: RegtenantPage;
  let fixture: ComponentFixture<RegtenantPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegtenantPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegtenantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
