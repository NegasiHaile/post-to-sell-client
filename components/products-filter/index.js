import { useState } from "react";
import { useRouter } from "next/router";
import Checkbox from "./form-builder/checkbox";
import CheckboxColor from "./form-builder/checkbox-color";
import Slider /* , { Range } */ from "rc-slider";
import Tooltip from "rc-tooltip";
import { useForm } from "react-hook-form";

// data
import productsTypes from "./../../utils/data/products-types";
import productsColors from "./../../utils/data/products-colors";
import productsSizes from "./../../utils/data/products-sizes";
import { displayMoney } from "./../../utils/helpers";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

//const { createSliderWithTooltip } = Slider;
//const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

const ProductsFilter = ({
  categories,
  categoriesloading,
  loadCategories,
  productCountByCategory,
  addArrayFilter,
  priceRange,
  addPriceFilter,
}) => {
  const router = useRouter();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const addQueryParams = (values) => {
    console.log("addQueryParams", values.target);
    // query params changes
  };

  return (
    <form className="products-filter" onChange={addQueryParams}>
      <button
        type="button"
        onClick={() => setFiltersOpen(!filtersOpen)}
        className={`products-filter__menu-btn ${
          filtersOpen ? "products-filter__menu-btn--active" : ""
        }`}
      >
        Add Filter <i className="icon-down-open"></i>
      </button>

      <div
        className={`products-filter__wrapper ${
          filtersOpen ? "products-filter__wrapper--open" : ""
        }`}
      >
        <div className="products-filter__block">
          <button type="button">Product Category</button>
          <div className="products-filter__block__content">
            {productCountByCategory &&
              productCountByCategory.map((category) => (
                <>
                  <Checkbox
                    key={category.id}
                    name="product-type"
                    label={category.name}
                    label2={`(${category.count})`}
                    onChange={(value) => {
                      addArrayFilter(
                        "categories",
                        category.id,
                        value.target.checked
                      );
                    }}
                  />
                </>
              ))}
          </div>
        </div>

        <div className="products-filter__block">
          <button type="button">Price</button>
          <div className="products-filter__block__content">
            <Range
              min={priceRange[0]}
              max={priceRange[1]}
              defaultValue={priceRange}
              tipFormatter={(value) => `${displayMoney(value)}`}
              onChange={(value) => addPriceFilter(value)}
            />
          </div>
        </div>

        <div className="products-filter__block">
          <button type="button">Size</button>
          <div className="products-filter__block__content">
            {productsSizes.map((productsSize) => (
              <div className="checkbox-square-wrapper">
                {productsSize.map((type) => (
                  <Checkbox
                    type="square"
                    key={type.id}
                    name="product-size"
                    label={type.label}
                    onChange={(value) => {
                      addArrayFilter("sizes", type.label, value.target.checked);
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="products-filter__block">
          <button type="button">Color</button>
          <div className="products-filter__block__content">
            {productsColors.map((productsColor) => (
              <div className="checkbox-color-wrapper">
                {productsColor.map((type) => (
                  <CheckboxColor
                    key={type.id}
                    name="product-color"
                    color={type.color}
                    onChange={(value) => {
                      addArrayFilter(
                        "colors",
                        type.color,
                        value.target.checked
                      );
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-submit btn--rounded btn--yellow"
        >
          Apply
        </button>
      </div>
    </form>
  );
};

export default ProductsFilter;
