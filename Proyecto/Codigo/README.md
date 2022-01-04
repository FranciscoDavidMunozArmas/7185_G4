# Mzmotos-Proyect

### Server Side

*Administracion del sistema*

	POST ./salesmen

	POST ./warehouses

	POST ./managers
	
	POST ./users/signin
	
	POST ./users/password/:username
	
	DELETE ./salesmen/salesman/:id

	DELETE ./warehouses/warehouse/:id

	DELETE ./managers/manager/:id

*Gestion de Clientes*

	POST ./clients
	
	GET ./clients
	
	PUT ./clients/client/:id
	
	DELETE ./clients/client/:id

*Inventario*

	POST ./products
	
	PUT ./products/:id

*Catalogue*

	GET ./products

*Gestion de Visitas*

	POST ./salesmen/appointments/:salesmanid
	
	GET ./salesmen/appointments/:salesmanid
	
	PUT ./salesmen/appointments/:salesmanid/:appointmentid

	DELETE ./salesmen/appointments/:salesmanid/:appointmentid

*Gestion de Pedidos*

	POST ./orders

	GET ./orders/order/:id

*Informes*

	GET ./reports/orders/order/:id
	
	GET ./reports/inventories/inventory/:id

### Client Side