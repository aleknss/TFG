from fastapi import HTTPException

class InventoryError(HTTPException):
    """Base exception for inventory-related errors"""
    pass

class InventoryNotFoundError(InventoryError):
    def __init__(self, inventory_id=None):
        message = "inventory not found" if inventory_id is None else f"Inventory with id {inventory_id} not found"
        super().__init__(status_code=404, detail=message)

class InventoryCreationError(InventoryError):
    def __init__(self, error: str):
        super().__init__(status_code=500, detail=f"Failed to create inventory: {error}")


class ItemError(HTTPException):
    """Base exception for item-related errors"""
    pass

class ItemNotFoundError(InventoryError):
    def __init__(self, item_id=None):
        message = "item not found" if item_id is None else f"Item with id {item_id} not found"
        super().__init__(status_code=404, detail=message)
class UserError(HTTPException):
    """Base exception for user-related errors"""
    pass

class ItemCreationError(InventoryError):
    def __init__(self, error: str):
        super().__init__(status_code=500, detail=f"Failed to create item: {error}")



class UserNotFoundError(UserError):
    def __init__(self, user_id=None):
        message = "User not found" if user_id is None else f"User with id {user_id} not found"
        super().__init__(status_code=404, detail=message)

class PasswordMismatchError(UserError):
    def __init__(self):
        super().__init__(status_code=400, detail="New passwords do not match")

class InvalidPasswordError(UserError):
    def __init__(self):
        super().__init__(status_code=401, detail="Current password is incorrect")

class AuthenticationError(HTTPException):
    def __init__(self, message: str = "Could not validate user"):
        super().__init__(status_code=401, detail=message)
