import { NgModule } from "@angular/core";
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { LoggingService } from "../logging.service";

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: '', component: ShoppingListComponent }
    ]),
    SharedModule,
    FormsModule
  ]
  // ,
  // providers: [LoggingService]
})
export class ShoppingListModule{

}