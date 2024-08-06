
import { Image } from 'antd'
export default (params) => (
    <span className="logoStr">
        {
            params.value && (
                <Image
                    width={100}
                    height={100}
                    src={"data:;base64," + params.value}
                />
            )}
    </span>
)