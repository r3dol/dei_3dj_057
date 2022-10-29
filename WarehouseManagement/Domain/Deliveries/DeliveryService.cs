using EletricGo.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EletricGo.Domain.Deliveries
{
    public class DeliveryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IDeliveryRepository _deliveryRepository;

        public DeliveryService(IUnitOfWork unitOfWork, IDeliveryRepository deliveryRepository)
        {
            _unitOfWork = unitOfWork;
            _deliveryRepository = deliveryRepository;
        }

        public async Task<List<DeliveryDTO>> GetDeliveries()
        {
            var deliveries = await _deliveryRepository.GetAll();
            return deliveries.Select(x => x.toDeliveryDTO()).ToList();
        }

        public async Task<DeliveryDTO> GetDelivery(DeliveryDTO deliveryDTO)
        {
            var delivery = await _deliveryRepository.GetByID(new DeliveryID(deliveryDTO.deliveryID));
            return delivery.toDeliveryDTO();
        }

        public async Task<DeliveryDTO> CreateDelivery(DeliveryDTO deliveryDTO)
        {
            var delivery = new Delivery(deliveryDTO);
            await _deliveryRepository.Add(delivery);
            await this._unitOfWork.CommitAsync();
            return delivery.toDeliveryDTO();
        }

        public async Task<DeliveryDTO> UpdateDelivery(DeliveryDTO deliveryDTO)
        {
            var delivery = await _deliveryRepository.GetByID(new DeliveryID(deliveryDTO.deliveryID));
            delivery.update(deliveryDTO);
            await _unitOfWork.CommitAsync();
            return delivery.toDeliveryDTO();
        }

        public async Task<DeliveryDTO> DeleteDelivery(DeliveryDTO deliveryDTO)
        {
            var delivery = await _deliveryRepository.GetByID(new DeliveryID(deliveryDTO.deliveryID));
            _deliveryRepository.Delete(delivery);
            await this._unitOfWork.CommitAsync();
            return delivery.toDeliveryDTO();
        }
    }

}