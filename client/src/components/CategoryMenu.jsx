import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../utils/globalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../utils/actions';
import { QUERY_CATEGORIES } from '../utils/queries';
import { idbPromise } from '../utils/helpers';

function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };
  return (
    <div>
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
          choose a category
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {categories.map((item) => (
            <li key={item._id}>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => handleClick(item._id)}
              >
                {item.name}
              </a>
            </li>
          ))}
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => handleClick('')}
            >
              All
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

  // return (
  //   <div>
  //     <h2>Choose a Category:</h2>
  //     {categories.map((item) => (
  //       <button
  //         key={item._id}
  //         onClick={() => {
  //           handleClick(item._id);
  //         }}
  //       >
  //         {item.name}
  //       </button>
  //     ))}
  //     <button
  //       onClick={() => {
  //         handleClick('');
  //       }}
  //     >
  //       All
  //     </button>
  //   </div>
  // );
// }

export default CategoryMenu;
