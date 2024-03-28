import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import LoadingButton from "./LoadingButton";
import Comboboxes from "./Comboboxes";
import ImageDragAndDrop from "./ImageDragAndDrop";

export default function ProductsForm({
  action = "add",
  dataEdit = {},
  isLoading = false,
  setShowForm,
  categoryOptions = [],
  selectCategory,
  setSelectCategory,
  productName,
  setProductName,
  suplier,
  setSuplier,
  description,
  setDescription,
  price,
  setPrice,
  priceFromSuplier,
  setPriceFromSuplier,
  currPage,
  product = {},
  image,
  setImage,
  setStock,
  stock,
}) {
  return (
    <form
      className="space-y-8 divide-y divide-gray-200"
      // onSubmit={handleSubmit}
    >
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {/* {title} Product */}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {/* {title} product's information. */}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                id="productName"
                className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                // defaultValue={product.name}
                value={productName}
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
                required
              />
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="suplier"
                className="block text-sm font-medium text-gray-700"
              >
                Suplier
              </label>
              <input
                type="text"
                name="suplier"
                id="suplier"
                className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                // defaultValue={product.name}
                value={suplier}
                onChange={(e) => {
                  setSuplier(e.target.value);
                }}
                required
              />
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="desc"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  type="text"
                  id="desc"
                  name="desc"
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Write a description about your product.
              </p>
            </div>

            <div className="sm:col-span-3 sm:col-start-1">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Product Category
              </label>
              <Comboboxes
                label="Category"
                people={categoryOptions}
                selectedValue={selectCategory}
                setSelectedValue={setSelectCategory}
                className="text-sm rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="priceFromSuplier"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                min="0"
                name="price"
                id="price"
                className="spin-hidden block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="priceFromSuplier"
                className="block text-sm font-medium text-gray-700"
              >
                Price From Suplier
              </label>
              <input
                type="number"
                min="0"
                name="priceFromSuplier"
                id="priceFromSuplier"
                className="spin-hidden block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                value={priceFromSuplier}
                onChange={(e) => {
                  setPriceFromSuplier(e.target.value);
                }}
              />
            </div>

            {/* {(userGlobal.role !== "superadmin" || action === "edit") && ( */}
            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="stock"
                className="block text-sm font-medium text-gray-700"
              >
                Stock
              </label>
              <input
                type="number"
                min="0"
                name="stock"
                id="stock"
                className="spin-hidden block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                value={stock}
                onChange={(e) => {
                  setStock(e.target.value);
                }}
              />
            </div>
            {/* )} */}

            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700">
                Product's Image
              </label>
              <ImageDragAndDrop
                className="mt-1"
                image={image}
                setImage={setImage}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
          {isLoading ? (
            <LoadingButton className="ml-3" />
          ) : (
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-amber-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Save
          </button>
          )}
        </div>
      </div> */}
        
    </form>
  );
}
