import React from "react";
import Button from "../../component/global/Button";
import Tools from "../Tools";

export function mapListItems(listItems)
{
    return listItems.map((i) => {return <a href={i.href} key={i.key}>{i.innerText}</a>});
}

export function mapImgs(imgs)
{
    return imgs.map((i) =>
    {
        return (
            <div>
            <a href={i.href} key={i.key}>
              <img src={i.src} alt={i.alt} style=
                  {
                      {
                          width: i.width,
                          height: i.height,
                          maxWidth: i.maxWidth,
                          maxHeight: i.maxHeight
                      }
                  }/>
              {(i.innerText) ?
                  <aside style=
                             {
                                 {
                                     fontSize: i.fontSize,
                                     width: i.asideWidth,
                                     height: i.asideHeight,
                                     maxWidth: i.asideMaxWidth,
                                     maxHeight: i.asideMaxHeight
                                 }
                             }> {i.innerText} </aside>
                  : ''
              }
                {
                    (i.datum.order) ?
                        <span> {`OrderID: ${i.datum.order.orderID}
                        Sum: ${i.datum.order.sum}
                        Time: ${i.datum.order.timeCreated}`} </span>
                        : ''
                }
                {
                    (i.datum.buyer) ?
                        <span> {`Username: ${i.datum.buyer.name}
                        Email: ${i.datum.buyer.email}
                        Address: ${i.datum.buyer.address}`} </span>
                        : ''
                }
            </a>

                {
                    (i.datum.cart) ?
                        <Button onClick={() => {Tools.deleteItem(i.datum.cart.cartID)}} innerText={"Delete"} />
                        : ''
                }</div>);
    });
}

export function mapInputs(inputs)
{
    return inputs.map((i) =>
    {
        return (
            <a href={i.href} key={i.key}>
                {(i.innerText) ?
                    <label style=
                               {
                                   {
                                       fontSize: i.labelFontSize,
                                       color: i.labelColor
                                   }
                               }> {i.innerText} </label>
                    : ''
                }
                <input type={i.type} name={i.name} placeholder={i.placeholder}
                       style=
                           {
                               {
                                   fontSize: i.fontSize,
                                   color: i.color,
                                   width: i.width,
                                   height: i.height
                               }
                           }
                       onChange={i.onChange}/>
            </a>);
    });
}