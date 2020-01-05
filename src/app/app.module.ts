import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreationOperatorsComponent } from './creation-operators/creation-operators.component';
import { JoinCreationOperatorsComponent } from './join-creation-operators/join-creation-operators.component';
import { MathBoolOperatorsComponent } from './math-bool-operators/math-bool-operators.component';

@NgModule({
  declarations: [
    AppComponent,
    CreationOperatorsComponent,
    JoinCreationOperatorsComponent,
    MathBoolOperatorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
