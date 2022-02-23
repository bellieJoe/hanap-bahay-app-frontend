import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminmenuPage } from './adminmenu.page';

describe('AdminmenuPage', () => {
  let component: AdminmenuPage;
  let fixture: ComponentFixture<AdminmenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminmenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminmenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
