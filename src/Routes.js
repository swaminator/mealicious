import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import CreateRecipe from "./containers/CreateRecipe";
import RecipeList from "./containers/RecipeList";
import NotFound from "./containers/NotFound";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/create">
        <CreateRecipe />
      </Route>
      <Route exact path="/recipes">
        <RecipeList />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}