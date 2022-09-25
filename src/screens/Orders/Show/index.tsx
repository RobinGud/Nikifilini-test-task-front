import React from "react";
import OrdersShowStore from "./store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import styles from "./styles.m.styl";
import Item from "./components/Item";
import DeliveryType from "~/components/DeliveryType";
import OrderStatus from "~/components/OrderStatus";

type ShowParams = {
  id: string;
};

const OrdersShow = observer(
  (): JSX.Element => {
    const { id } = useParams<ShowParams>()
    const [state] = React.useState(new OrdersShowStore());

    React.useEffect(() => {
      if (state.initialized) return;
      state.initialize(id)
    }, [id, state])

    return (
      <div className={styles.screenWrapper}>
        <div className={styles.screen}>
          <div className={styles.items}>
            <h1>№: {state.order?.number}</h1>
            <h3>ID: {state.order?.id}</h3>
            <div title={state.order?.status}>
              <h3>Status: </h3>
              <OrderStatus code={state.order?.status || ''} />
            </div>
            <div title={state.order?.delivery?.code}>
              <h3>Code: </h3>
              {state.order?.delivery && <DeliveryType code={state.order?.delivery?.code} />}
            </div>
            <h3>Items: </h3>
            {state.order?.items.map((obj, index) => (
              <Item item={obj} key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default OrdersShow;
