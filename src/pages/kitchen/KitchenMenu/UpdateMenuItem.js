import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../../actions/error";
import {
  getKitchenMenuAction,
  updateMenuItemAction,
} from "../../../actions/kitchen/menu";
import {  UPDATE_MENU_ITEM_RESET } from "../../../actions/kitchen/typesMenu";
import { UPLOAD_MENU_IMAGE_RESET } from "../../../actions/kitchen/types_upload_image";
import { notifyError, notifySuccess } from "../../../alert/taostifyalert";
import DotPulse from "../../../loader/DotPulse";
import { FiCamera } from "react-icons/fi";
import { BsCheck2 } from "react-icons/bs";

import SaveOrNot from "../../../components/SaveOrNot";
import { uploadMenuImageAction } from "../../../actions/kitchen/image_upload_menu";
import {
  addItemSubInventory,
  getAllSubInventory,
} from "../../../actions/kitchen/sub_inventory";
import { getKitchenIdAction } from "../../../actions/kitchen/kitchenId";
import { ADD_ITEM_SUBiN_RESET } from "../../../actions/kitchen/types_subInventory";
import { useParams } from "react-router-dom";

const AddItemToMenu = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { isupdated, error, loading } = useSelector(
    (state) => state.updateMenuItem
  );
  const {
    isuploaded,
    error: imgError,
    loading: imgLoad,
    image,
  } = useSelector((state) => state.uploadMenuImage);
  const { kitchenId } = useSelector((state) => state.getKitchenId);
  const { kitchenMenu } = useSelector((state) => state.getKitchenMenu);
  const { subInventory: allsubInventory } = useSelector(
    (state) => state.allSubInventory
  );
  const {
    isadded,
    loading: addload,
    error: addError,
  } = useSelector((state) => state.addSubInventory);

  const [isMultipleInventory, setIsMultipleInventory] = useState(false);
  const [inweight, setInweight] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [mySubInventory, SetMySubInventory] = useState([]);
  const [menu, setMenu] = useState({});

  //drop down box open
  const openBox = () => {
    setIsOpen(!isOpen);
  };

  //input fields state managing
  const [inputs, setInputs] = useState({
    name: "",
    price: "",
    portionFor: "",
    quantityMeasurement: inweight ? "WEIGHT" : "PIECE",
    quantity: "",
    isNonVeg: false,
    portionSize: "",
    isMeasurable: false,
    isMultipleInventory: false,
    subinventoryName: "",
    subinventoryWeight: "",
  });

  const [images, setImage] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [subInventory, setSubInventory] = useState([]);

  const {
    name,
    price,
    portionFor,
    quantityMeasurement,
    quantity,
    isNonVeg,
    portionSize,
    isMeasurable,
    subinventoryName,
    subinventoryWeight,
  } = inputs;

  const [open, setOpen] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const [openInv, setOpenInv] = useState(false);

  //click open
  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClickOpenImg = (e) => {
    e.preventDefault();
    setOpenImg(true);
  };
  const handleClickOpenInv = (e) => {
    e.preventDefault();
    setOpenInv(true);
  };

  //click close
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseImg = () => {
    setOpenImg(false);
  };
  const handleCloseInv = () => {
    setOpenInv(false);
  };

  //uploading the image
  const handleSubmitImg = async (e) => {
    e.preventDefault();
    handleCloseImg();
    const formData = { base64Image: images, fileName: kitchenId };

    dispatch(uploadMenuImageAction(formData));
    setOpenImg(false);
  };

  //submiting the form input data.
  const handleSubmit = async (e) => {
    e.preventDefault();

    handleClose();
    const formData = {
      itemId: kitchenMenu[0].id,
      kitchenId,
      name,
      images,
      price,
      portionFor,
      quantityMeasurement,
      quantity,
      isNonVeg,
      portionSize,
      isMeasurable,
      isMultipleInventory,
      subInventory: mySubInventory,
    };

    console.log(formData);
    dispatch(updateMenuItemAction(formData));
    setOpen(false);
  };

  //submiting subinventory
  const handleSubmitSubInventory = async (e) => {
    e.preventDefault();
    Object.values(subInventory).map((item) => {
      if (item.name === subinventoryName) {
        notifyError("This inventory is already exist.");
        return;
      }
    });

    handleCloseInv();
    const formData = {
      kitchenId,
      name: subinventoryName,
      weight: subinventoryWeight,
    };

    dispatch(addItemSubInventory(formData));
    setOpenInv(false);
  };

  //changing the input values.
  const onchange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  //add my subinventory
  const addMySubinventory = (id) => {
    Object.values(subInventory).map((item) => {
      if (item.id === id) {
        if (item.isadded === true) {
          item.isadded = false;
        } else {
          item.isadded = true;
        }
        setSubInventory([...subInventory]);

        //check for isExist
        const index = mySubInventory.findIndex((x) => x.id === id);
        if (index > -1) {
          mySubInventory.splice(index, 1);
          SetMySubInventory([...mySubInventory]);
        } else {
          SetMySubInventory([...mySubInventory, { id }]);
        }
      }
    });
  };

  //reading images from device
  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImage([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [reader.result]);
          setImage(reader.result);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  // set is item is single or not
  const setIsSingle = (e) => {
    if (e.target.value === "true") setIsMultipleInventory(true);
    else setIsMultipleInventory(false);
  };

  //is in weight or piece
  const setIsInWeight = (e) => {
    if (e.target.value === "true") setInweight(true);
    else setInweight(false);
  };

  useEffect(() => {
    if (allsubInventory.items) {
      setSubInventory([...allsubInventory.items]);
    }
  }, [allsubInventory]);

  useEffect(() => {
    if (subInventory.length > 0 && menu) {
      subInventory.map((item) => {
        menu.subInventory.map((i) => {
          if (i.id === item.id) {
            item.isadded = true;
          }
          SetMySubInventory([...menu.subInventory]);
        });
      });
    }
  }, [subInventory, menu]);

  // get all subinventories
  useEffect(() => {
    if (typeof kitchenId === "string") {
      dispatch(getAllSubInventory(kitchenId));
    }
  }, [dispatch, kitchenId, isadded]);

  //get kitchen id from localhost
  useEffect(() => {
    dispatch(getKitchenIdAction());
  }, [dispatch]);

  useEffect(() => {
    if (isupdated) {
      notifySuccess("Your item is updated.");
      dispatch({ type: UPDATE_MENU_ITEM_RESET });
    }
  }, [isupdated, dispatch]);

  useEffect(() => {
    if (isadded) {
      notifySuccess("Item added successfully.");
      dispatch({ type: ADD_ITEM_SUBiN_RESET });
    }
  }, [isadded, dispatch]);

  useEffect(() => {
    if (isuploaded) {
      notifySuccess("Image uploaded successfully.");
      dispatch({ type: UPLOAD_MENU_IMAGE_RESET });
    }
  }, [isuploaded, dispatch]);

  //clear all the errors
  useEffect(() => {
    if (error || imgError || addError) {
      error && notifyError(error);
      imgError && notifyError(imgError);
      addError && notifyError(imgError);
      dispatch(clearError());
    }
  }, [error, imgError, dispatch, addError]);

  // get kitchen menu
  useEffect(() => {
    if (id) {
      dispatch(getKitchenMenuAction(id));
    }
  }, [dispatch, id]);

  //setting image
  useEffect(() => {
    if (menu) {
      if (menu.images && menu.images[0].url) {
        setImage([{ id: menu.images[0].id, url: menu.images[0].url }]);
        console.log(menu.images[0].id);
        console.log(menu.images[0].url);
        setImagesPreview((old) => [, menu.images[0].url]);
      }
    }
  }, [menu]);

  // setting input fields
  useEffect(() => {
    if (menu) {
      setInputs({
        ...inputs,
        name: menu.name,
        price: menu.price,
        portionFor: menu.portionFor,
        portionSize: menu.portionSize,
        quantityMeasurement: menu.quantityMeasurement,
        quantity: menu.quantity,
        isNonVeg: menu.isNonVeg,
        isMultipleInventory: menu.isMultipleInventory,
      });
    }
    if (menu.isMultipleInventory === true) {
      setIsMultipleInventory(true);
    }
  }, [menu]);

  useEffect(() => {
    if (kitchenMenu && kitchenMenu[0]) {
      setMenu({ ...kitchenMenu[0] });
    }
  }, [kitchenMenu]);

  return (
    <>
      <SaveOrNot formSubmit={handleSubmit} isopen={open} close={handleClose} />
      <SaveOrNot
        formSubmit={handleSubmitImg}
        isopen={openImg}
        close={handleCloseImg}
      />
      <SaveOrNot
        formSubmit={handleSubmitSubInventory}
        isopen={openInv}
        close={handleCloseInv}
      />
      {menu && (
        <div className="w-full bg-gray-100 min-h-screen pb-12">
          <div className="max-w-4xl mx-auto py-8">
            <div className="p-4 w-full flex flex-col">
              <div className="w-full mb-8">
                <h1 className="text-2xl font-medium mb-2">Update Menu</h1>
              </div>
              <div className="shadow-lg rounded bg-white p-4 sm:p-8 relative">
                {/* first form */}
                <form
                  className="w-full mb-6 relative flex items-end flex-wrap"
                  onSubmit={handleClickOpenImg}
                >
                  <div className="relative mr-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={createProductImagesChange}
                      name="image"
                      id="image-upload"
                      draggable
                      className="rounded outline-none border border-gray-300 pl-24 focus:border-black mx-auto w-16 h-20 overflow-hidden cursor-pointer"
                    />
                    <label
                      htmlFor="image-upload"
                      className="absolute top-7 left-10 cursor-pointer"
                    >
                      <FiCamera style={{ fontSize: "1.5rem" }} />
                    </label>
                  </div>
                  <div className="flex mr-4">
                    {imagesPreview &&
                      imagesPreview.length > 0 &&
                      imagesPreview.map((image, index) => (
                        <div className="h-20 w-20  mr-0 relative" key={index}>
                          <img
                            src={image}
                            alt=""
                            className="absolute h-full w-full object-contain"
                          />
                        </div>
                      ))}
                  </div>
                  <button className="w-fit px-8 text-center h-10 p-2 bg-cyan-600 text-white select-none cursor-pointer mt-4 rounded">
                    {imgLoad ? <DotPulse /> : <>upload</>}
                  </button>
                </form>
                {/* form two */}
                <form
                  className="flex flex-wrap justify-between"
                  onSubmit={handleClickOpen}
                >
                  <div className="w-full sm:w-[49%] mb-4 relative">
                    <input
                      type="text"
                      name="name"
                      onChange={onchange}
                      value={inputs.name}
                      placeholder="Item name"
                      className="rounded w-full outline-none border border-gray-300 p-2 focus:border-black"
                    />
                  </div>
                  <div className="w-full sm:w-[49%] mb-4 relative">
                    <input
                      type="text"
                      name="price"
                      onChange={onchange}
                      value={inputs.price}
                      placeholder="Price"
                      className="rounded w-full outline-none border border-gray-300 p-2 focus:border-black"
                    />
                  </div>
                  <div className="w-full sm:w-[49%] mb-6 relative">
                    <select
                      className="rounded w-full outline-none border border-gray-300 p-2 focus:border-black"
                      name="portionFor"
                      value={inputs.portionFor}
                      onChange={onchange}
                    >
                      <option value={"1"}>portion for 1</option>
                      <option value={"2"}>portion for 2</option>
                      <option value={"3"}>portion for 3</option>
                      <option value={"0"}>NA</option>
                    </select>
                  </div>
                  <div className="w-full sm:w-[49%] mb-6 relative">
                    <select
                      className="rounded w-full outline-none border border-gray-300 p-2 focus:border-black"
                      name="portionSize"
                      value={inputs.portionSize}
                      onChange={onchange}
                    >
                      <option value={"01"}>half</option>
                      <option value={"02"}>full</option>
                    </select>
                  </div>
                  <div className="w-full sm:w-[49%] mb-6 relative">
                    <select
                      className="rounded w-full outline-none border border-gray-300 p-2 focus:border-black"
                      name="isMeasurable"
                      value={inputs.isMeasurable}
                      onChange={onchange}
                    >
                      <option value={""}>Ismeasurable</option>
                      <option value={true}>Yes</option>
                      <option value={false}>Not</option>
                    </select>
                  </div>
                  <div className="w-full sm:w-[49%] mb-6 relative">
                    <select
                      className="rounded w-full outline-none border border-gray-300 p-2 focus:border-black"
                      onChange={setIsInWeight}
                    >
                      <option value={true}>weight</option>
                      <option value={false}>piece</option>
                    </select>
                  </div>
                  <div className="w-full sm:w-[49%] mb-6 relative">
                    {inweight ? (
                      <input
                        type="number"
                        name="quantity"
                        onChange={onchange}
                        value={inputs.quantity}
                        placeholder="weight"
                        className="rounded w-full outline-none border border-gray-300 p-2 focus:border-black"
                      />
                    ) : (
                      <input
                        type="number"
                        name="quantity"
                        onChange={onchange}
                        value={inputs.quantity}
                        placeholder="piece"
                        className="rounded w-full outline-none border border-gray-300 p-2 focus:border-black"
                      />
                    )}
                  </div>
                  <div className="w-full sm:w-[49%] mb-6 relative">
                    <select
                      className="rounded w-full outline-none border border-gray-300 p-2 focus:border-black"
                      onChange={onchange}
                      name="isNonVeg"
                      value={inputs.isNonVeg}
                    >
                      <option value={false}>veg</option>
                      <option value={true}>non-veg</option>
                    </select>
                  </div>
                  <div className="w-full sm:w-[49%] mb-6 relative">
                    <select
                      className="w-full rounded outline-none border border-gray-300 p-2 focus:border-black"
                      onChange={setIsSingle}
                      name="isMultipleInventory"
                    >
                      <option value={false}>single item inventory</option>
                      <option value={true}>multiple item inventory</option>
                    </select>
                  </div>
                  {isMultipleInventory === true && (
                    <div className="w-full sm:w-[49%] mb-6 relative rounded border border-gray-300 h-10 z-50">
                      <div
                        className="h-10 cursor-pointer flex items-center justify-center select-none"
                        onClick={() => openBox()}
                      >
                        {isOpen ? <>Close</> : <>Open</>} sub-inventory
                      </div>
                      {isOpen && (
                        <div className="bg-white shadow-md cursor-default h-32 max-h-fit overflow-auto">
                          {subInventory.map((item) => (
                            <div
                              className="p-2 flex items-center select-none"
                              key={item.id}
                              onClick={() => addMySubinventory(item.id)}
                            >
                              {item.name} - {item.weight} gm
                              {item.isadded && (
                                <BsCheck2
                                  style={{ color: "green", marginLeft: "1rem" }}
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  <button className="absolute top-full left-0 w-fit px-8 text-center h-10 p-2 bg-cyan-600 text-white select-none cursor-pointer mt-4 rounded">
                    {loading ? <DotPulse /> : <>Update</>}
                  </button>
                </form>
                <form
                  className="w-full relative flex items-end"
                  onSubmit={handleClickOpenInv}
                >
                  {isMultipleInventory === true && (
                    <>
                      <div className="flex w-full">
                        <div className="w-[40%] relative">
                          <input
                            type="text"
                            name="subinventoryName"
                            onChange={onchange}
                            value={inputs.subinventoryName}
                            placeholder="Sub-item name"
                            className="w-full rounded outline-none border border-gray-300 p-2 focus:border-black"
                          />
                        </div>
                        <div className="w-[40%] relative mx-2">
                          <input
                            type="number"
                            name="subinventoryWeight"
                            onChange={onchange}
                            value={inputs.subinventoryWeight}
                            placeholder="Weight"
                            className="w-full rounded outline-none border border-gray-300 p-2 focus:border-black"
                          />
                        </div>
                        <button className="w-[18%] text-center h-10 p-2 bg-cyan-600 text-white select-none cursor-pointer rounded">
                          {addload ? <DotPulse /> : <>Add</>}
                        </button>
                      </div>
                    </>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddItemToMenu;
