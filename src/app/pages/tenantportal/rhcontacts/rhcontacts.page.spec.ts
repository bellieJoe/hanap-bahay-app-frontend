import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RhcontactsPage } from './rhcontacts.page';

describe('RhcontactsPage', () => {
  let component: RhcontactsPage;
  let fixture: ComponentFixture<RhcontactsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RhcontactsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RhcontactsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
