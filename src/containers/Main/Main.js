import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls//BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
import * as actions from '../../store/actions'
import './Main.css'
import { RadialChart, Sankey, Sunburst, YAxis, HorizontalGridLines, LineSeries } from 'react-vis';


export const Main = ({ history }) => {
    const [purchasing, setPurchasing] = useState(false);

    const myDatas = [{ angle: 1 }, { angle: 5 }, { angle: 2 }]

    const nodes = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];
    const links = [
        { source: 0, target: 1, value: 10 },
        { source: 0, target: 2, value: 20 },
        { source: 1, target: 2, value: 20 }
    ];


    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);

    const dispatch = useDispatch();

    const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients])

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey =>
                ingredients[igKey]
            )
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        return sum > 0
    }

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true)
        } else {
            onSetAuthRedirectPath('/checkout');
            history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        history.push('/checkout');
    }

    const disabledInfo = {
        ...ings
    }
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    if (ings) {
        burger = (
            <Fragment>
                <Burger
                    ingredients={ings}
                />
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disabled={disabledInfo}
                    price={price}
                    purchasable={updatePurchaseState(ings)}
                    ordered={purchaseHandler}
                    isAuth={isAuthenticated}
                />
            </Fragment>
        )
        orderSummary = (
            <OrderSummary
                ingredients={ings}
                price={price}
                purchaseCanceled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
            />
        )
    }

    const myData = {
        "title": "analytics",
        "color": "#12939A",
        "children": [
         {
          "title": "cluster",
          "children": [
           {"title": "AgglomerativeCluster", "color": "#12939A", "size": 3938},
           {"title": "CommunityStructure", "color": "#12939A", "size": 3812},
           {"title": "HierarchicalCluster", "color": "#12939A", "size": 6714},
           {"title": "MergeEdge", "color": "#12939A", "size": 743}
          ]
         },
         {
          "title": "graph",
          "children": [
           {"title": "BetweennessCentrality", "color": "#12939A", "size": 3534},
           {"title": "LinkDistance", "color": "#12939A", "size": 5731},
           {"title": "MaxFlowMinCut", "color": "#12939A", "size": 7840},
           {"title": "ShortestPaths", "color": "#12939A", "size": 5914},
           {"title": "SpanningTree", "color": "#12939A", "size": 3416}
          ]
         },
         {
          "title": "optimization",
          "children": [
           {"title": "AspectRatioBanker", "color": "#12939A", "size": 7074}
          ]
         }
        ]
       }

    return (
        // <Fragment>
        <div className="containerd">

            <div className="chartContainer">
                <RadialChart
                    data={myDatas}
                    width={300}
                    height={300} />

                <div className="subtitle">100% de croissance par rapport aux 30 derniers jours</div>

            </div>
 {/* 
             <div className="chartContainer">
                <RadialChart
                    data={myData}
                    width={300}
                    height={300} />

                <div className="subtitle">100% de croissance par rapport aux 30 derniers jours</div>

            </div> */}


            <div className="chartContainer">

                <Sunburst
                    hideRootNode
                    colorType="literal"
                    data={myData}
                    height={300}
                    width={350} />

                <div className="subtitle">100% de croissance par rapport aux 30 derniers jours</div>

            </div>

            {/* <Modal
                show={purchasing}
                modalClosed={purchaseCancelHandler}
            >
                {orderSummary}
            </Modal>
            {burger} */}
        </div>
        // </Fragment>

    )
}

// const mapStateToProps = state => ({
//     ings: state.burgerBuilder.ingredients,
//     price: state.burgerBuilder.totalPrice,
//     error: state.burgerBuilder.error,
//     isAuthenticated: state.auth.token !== null
// })

// const mapDispatchToProps = dispatch => ({
//     onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
//     onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
//     onInitIngredients: () => dispatch(actions.initIngredients()),
//     onInitPurchase: () => dispatch(actions.purchaseInit()),
//     onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
// })

export default withErrorHandler(Main, axios);