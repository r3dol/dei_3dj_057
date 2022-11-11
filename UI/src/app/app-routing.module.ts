import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
// import { RegisterComponent } from './components/register/register.component';
import { CreateTruckComponent } from './components/Logistics/truck/create-truck/create-truck.component';
import { FleetManagerComponent } from './components/Logistics/home/fleet-manager/fleet-manager.component';
import { LogisticsManagerComponent } from './components/Logistics/home/logistics-manager/logistics-manager.component';
import { RoadNetworkComponent } from './components/Logistics/road-network/road-network.component';
import { WarehouseManagerComponent } from './components/WarehouseManagement/home/warehouse-manager/warehouse-manager.component';


const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'Logistics/Truck/CreateTruck', component: CreateTruckComponent },
  { path: 'Logistics/Home/FleetManager', component: FleetManagerComponent},
  { path: 'Logistics/Home/LogisticsManager', component: LogisticsManagerComponent},
  { path: 'WarehouseManagement/Home/WarehouseManager', component: WarehouseManagerComponent},
  { path: 'Logistics/RoadNetwork', component: RoadNetworkComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
