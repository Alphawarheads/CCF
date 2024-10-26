import hashlib
import json
import sys


def hash_panel_data(panel_data):
    """
    对传入的 JSON 字符串进行哈希加密
    :param panel_data: 字典格式的数据
    :return: 加密后的哈希值
    """
    # 将字典转为 JSON 字符串
    panel_data_str = json.dumps(panel_data, sort_keys=True)  # sort_keys 确保字典顺序一致
    print(f"要加密的数据: {panel_data_str}")

    # 使用 SHA-256 对字符串进行哈希加密
    hash_object = hashlib.sha256(panel_data_str.encode('utf-8'))
    hash_hex = hash_object.hexdigest()

    return hash_hex


def read_json_file(json_file):
    """
    从 JSON 文件读取数据
    :param json_file: JSON 文件路径
    :return: 解析后的 JSON 数据
    """
    with open(json_file, 'r', encoding='utf-8') as file:
        data = json.load(file)
    return data


def main():
    # 确保用户提供了 JSON 文件路径作为命令行参数
    if len(sys.argv) != 2:
        print("使用方式: python generatePanel.py <json_file>")
        sys.exit(1)

    # 获取命令行参数中的 JSON 文件路径
    json_file = sys.argv[1]

    # 读取 JSON 文件
    panel_data = read_json_file(json_file)

    # 生成哈希值
    panel_hash = hash_panel_data(panel_data)

    # 输出结果
    print(f"生成的哈希值: {panel_hash}")


if __name__ == "__main__":
    main()
