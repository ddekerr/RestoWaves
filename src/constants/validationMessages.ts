export default {
  VALIDATION_ERROR: 'Validation error',

  // Category fields validation
  CATEGORY_TITLE_STRING_MSG: 'Category title must be a string',
  CATEGORY_TITLE_EMPTY_MSG: 'Category title must not be empty',
  CATEGORY_TITLE_MIN_LENGTH_MSG:
    'Category title must be at least $constraint1 characters',

  CATEGORY_PARENT_NUMBER_MSG: 'Category parent ID must be a number',
  CATEGORY_PARENT_MIN_NUMBER_MSG:
    'Category parent ID cannot be less than $constraint1',

  // Model fields validation
  MODEL_TITLE_STRING_MSG: 'Model title must be a string',
  MODEL_TITLE_EMPTY_MSG: 'Model title must not be empty',
  MODEL_TITLE_MIN_LENGTH_MSG:
    'Model title must be at least $constraint1 characters',

  // Brand fields validation
  BRAND_TITLE_STRING_MSG: 'Brand title must be a string',
  BRAND_TITLE_EMPTY_MSG: 'Brand title must not be empty',
  BRAND_TITLE_MIN_LENGTH_MSG:
    'Brand title must be at least $constraint1 characters',

  // Product fields validation
  PRODUCT_TITLE_STRING_MSG: 'Products title must be a string',
  PRODUCT_TITLE_EMPTY_MSG: 'Products title must not be empty',
  PRODUCT_TITLE_MIN_LENGTH_MSG:
    'Product title must be at least $constraint1 characters',

  PRODUCT_PRICE_NUMBER_MSG: 'Products price must be a number',
  PRODUCT_PRICE_MIN_NUMBER_MSG:
    'Products price cannot be less than $constraint1',

  PRODUCT_CODE_NUMBER_MSG: 'Products code must be a number',
  PRODUCT_CODE_MIN_NUMBER_MSG: 'Products code cannot be less than $constraint1',

  PRODUCT_SIZES_ARRAY_MSG: 'Products sizes must be an array',
  PRODUCT_SIZES_ARRAY_FIT_MSG: 'Products sizes must fit the $constraint1',

  PRODUCT_CATEGORY_ARRAY_MSG: 'Category IDs must be an array',
  PRODUCT_CATEGORY_ARRAY_NUMBER_MSG: 'Each array element must be a number',
  PRODUCT_CATEGORY_ARRAY_MIN_NUMBER_MSG:
    'Each array element cannot be less than $constraint1',

  RELATION_TYPE_ENUM_MSG: 'Type must be a $constraint1',
  RELATION_TYPE_EMPTY_MSG: 'Type must not be empty',
};
