import { makeAutoObservable } from "mobx";
import { SingleOrder } from "~/screens/Orders/Show/types";
import { ORDER_QUERY } from "./queries";
import client from "api/gql";

export default class OrdersShowStore {
  order: SingleOrder | null = null;
  id: string | null = null;
  loading: boolean = false;
  initialized: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setOrder(order: SingleOrder): void {
    this.order = order;
  }

  async loadOrder(): Promise<void> {
    this.loading = true;

    client
      .query(ORDER_QUERY, { number: this.id })
      .toPromise()
      .then((result) => {
        this.setOrder(result.data.order);
        this.loading = false;
      });

  }

  initialize(id: string): void {
    if (this.initialized) return;
    this.initialized = true;
    this.id = id;
    this.loadOrder();
  }
}
