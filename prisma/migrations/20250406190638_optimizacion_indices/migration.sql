-- CreateIndex
CREATE INDEX `DetallePedido_pedidoId_productoId_idx` ON `DetallePedido`(`pedidoId`, `productoId`);

-- CreateIndex
CREATE INDEX `Producto_nombre_idx` ON `Producto`(`nombre`);

-- CreateIndex
CREATE INDEX `Usuario_email_idx` ON `Usuario`(`email`);

-- RenameIndex
ALTER TABLE `Pedido` RENAME INDEX `Pedido_usuarioId_fkey` TO `Pedido_usuarioId_idx`;
