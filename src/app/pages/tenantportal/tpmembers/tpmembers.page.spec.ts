import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TpmembersPage } from './tpmembers.page';

describe('TpmembersPage', () => {
  let component: TpmembersPage;
  let fixture: ComponentFixture<TpmembersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpmembersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TpmembersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
