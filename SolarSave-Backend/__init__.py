import os
import sys
import importlib

# 获取当前文件所在目录的父目录
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.abspath(os.path.join(current_dir, os.pardir))
print(parent_dir)
# 遍历父目录下的每个文件夹
for item in os.listdir(parent_dir):
    item_path = os.path.join(parent_dir, item)

    # 只处理文件夹，确保它们在sys.path中
    if os.path.isdir(item_path):
        if item_path not in sys.path:
            sys.path.insert(0, item_path)

        # 检查文件夹中是否有 __init__.py 文件，标识它是一个模块
        init_file = os.path.join(item_path, '__init__.py')
        if os.path.exists(init_file):
            # 动态导入模块
            try:
                importlib.import_module(item)

            except ModuleNotFoundError as e:
                print(f"Failed to import module {item}: {e}")
