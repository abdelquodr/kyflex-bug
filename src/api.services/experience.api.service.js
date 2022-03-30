import BaseAPIService from "./base.api.service";

export default class ExperienceAPIService extends BaseAPIService {
  bookingBasePath = '/bookings';
  experienceBasePath = '/experiences';

  create(dto) {
    return this.client.post(`${this.experienceBasePath}/`, dto);
  }

  fetch(params) {
    return this.client.get(`${this.experienceBasePath}/`, { params });
  }

  get(id) {
    return this.client.get(`${this.experienceBasePath}/${id}/`);
  }

  update(id, dto) {
    return this.client.patch(`${this.experienceBasePath}/${id}/`, dto);
  }

  delete(id) {
    return this.client.delete(`${this.experienceBasePath}/${id}/`);
  }

  bookEvent(dto) {
    return this.client.post(this.bookingBasePath, dto);
  }

  getBookings(mode) {
    return this.client.get(this.bookingBasePath, {
      params: { mode },
    });
  }

  payForBooking(bookingId) {
    return this.client.get(`/payments/stripe/pay/${bookingId}`);
  }

  cancelBookingAsCustomer(bookingId) {
    return this.client.patch(`${this.bookingBasePath}/${bookingId}/`, {
      status: "canceled",
    });
  }

  updateBookingAsHost(bookingId, status) {
    return this.client.patch(`/${this.bookingBasePath}/${bookingId}/?mode=host`, { status });
  }
}
